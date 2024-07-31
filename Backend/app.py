from functools import wraps

from flask import Flask, request, g , jsonify 

import os

from werkzeug.utils import secure_filename

import sqlite3

from uuid import uuid4

from setup_db import create_connection

from Queries.insert_queries import add_user, add_meal_to_calender, add_ingredient, add_ingredient_to_meal, add_meal

from Queries.delete_queries import delete_meal, delete_meal_from_calender, delete_ingredient, delete_ingredient_from_specific_meal_with_ingredient_and_meal_id, delete_ingredient_from_meals_with_ingredient_id, delete_ingredients_from_meal_with_meal_id

from Queries.select_queries import (select_all_users_username, select_password_for_given_user, select_all_users_username_except_one, select_all_users_emails_except_one,
select_meal_calender, select_personal_meals_with_ingredients, select_user_by_token, select_user_no_by_username, select_meals_the_ingredient_were_in, select_users_meals, select_users_ingredients, select_users_calender_entries,
select_info_for_user_by_id, select_average_macros, select_personal_ingredients, select_ingredient_by_id, select_password_by_id, select_user_profile_picture_path, select_all_users_emails)

from Queries.update_queries import (update_user_info, update_personal_meal, update_password_by_user_id,
							update_ingredient, update_personal_meal_name, update_total_macros_of_meal_ingredient_was_used_for, UPDATE_reCalcMacrosForMeals, update_user_profile_picture, update_user_token)

from inputValidation import isUsernameValid, isPasswordValid, validateUserInfo, isIngredientValid, isMealNameValid, validateIngredients_for_meal, validateOwnership, isCalenderDateAndTimeValid, validatePicture

from encryption import get_hashed_password, check_password

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.secret_key = 'secret_key'
app.config['picture_folder'] = "../src/assets/images"

def get_db():
    if 'db' not in g:
        g.db = create_connection(r"./database.db")  
    return g.db

def token_required(f):
	@wraps(f)
	def decorator(*args, **kwargs):
		token = None
		if 'Authorization' in request.headers:
			auth_header = request.headers['Authorization']
			token = auth_header.split(' ')[1]  

		if not token:
			return jsonify({'message': 'Token is missing!'}), 401

		user = select_user_by_token(get_db(), token)

		if user is None:
			return jsonify({'message': 'Invalid token!'}), 403

		g.user = {'id': user[0], 'username': user[1]}

		return f(*args, **kwargs)

	return decorator
	
@app.route('/login', methods=["POST"])
def loginPage():
	username = request.json['username']
	password = request.json['password']

	users_password = select_password_for_given_user(get_db(), username) #Indexing the tuple

	if not isUsernameValid(username) or users_password is None:

		return jsonify({'message': 'Wrong Password'}), 401
	elif isPasswordValid(password) and check_password(password, users_password[0]):

		token = str(uuid4())
		result = update_user_token(get_db(), token, username)
		
		if result:
			return jsonify({'token': token}), 200
		else:
			return 400

@app.route('/register', methods=["GET","POST"])
def register():
	username = request.json['register_username']
	usernames = select_all_users_username(get_db())

	for nickname in usernames:
		if username == nickname[0]:
			return 'Username is already taken', 500

	password = request.json['register_password']
	confirm_password = request.json['confirm_password']
	gender = int(request.json['_gender'])
	activity_lvl = int(request.json['_activity_lvl'])
	email = request.json['register_email']
	name = request.json['register_name']
	weight = float(request.json['register_weight'])
	height = float(request.json['register_height'])
	age = int(request.json['register_age'])

	for user_email in select_all_users_emails(get_db()):
		if email == user_email:
			return 'Email is already taken', 500

	register_validation = validateUserInfo(username, gender, activity_lvl, email, name, weight, height, age)

	if(not isPasswordValid(password) or not isPasswordValid(confirm_password) or 
	   password != confirm_password or not register_validation):
		
		return 400

	hashedPassword = get_hashed_password(password)
	
	## Adding a new user ##
	result = add_user(get_db(), username, hashedPassword, gender, activity_lvl, email, name, weight, height, age)

	if result:
		return 200
	else:
		return 400

@app.route('/password', methods=["PUT"])
@token_required
def change_password():
	old_password = request.json['old_password']
	new_password = request.json['new_password']
	confirm_new_password = request.json['confirm_new_password']

	arr = [old_password, new_password, confirm_new_password]

	for password in arr:
		if isPasswordValid(password) is False:
			return 400

	if not check_password(old_password, select_password_by_id(get_db(), 1)):
		return 'Old password is incorrect', 400
	
	if new_password != confirm_new_password:
		return jsonify({'message': 'The new passwords does not match'}), 400
	
	if new_password == old_password:
		return jsonify({'message': 'The new password cant be the same as your old password'}), 400

	update_password_by_user_id(get_db(), get_hashed_password(new_password), 1)
	return jsonify({'message': 'Successfully changed your password'}), 200

@app.route('/user_info', methods=["PUT"])
@token_required
def update_user_information():
		try:
			name = request.json['name']
			username = request.json['username']
			age = int(request.json['age'])
			email = request.json['email']
			height = float(request.json['height'])
			weight = float(request.json['weight'])
			gender = int(request.json['gender'])
			activity_lvl = int(request.json['activity_lvl'])
			email = request.json['email']

			user_id = select_user_no_by_username(get_db(), username)
			
			usernames = select_all_users_username_except_one(get_db(), user_id)

			for nickname in usernames:
				if username == nickname[0]:
					return jsonify({'message': 'Username is already taken'}), 500
				
			emails = select_all_users_emails_except_one(get_db(), user_id)

			for user_email in emails:
				if email == user_email[0]:
					return jsonify({'message': 'Email is already taken'}), 500

			user_info_validation = validateUserInfo(username, gender, activity_lvl, email, name, weight, height, age)

			if(user_info_validation is not True): 
				return jsonify({'message': user_info_validation}), 400

			update_user_info(get_db(), user_id, name, username, age, email, height, weight, gender, activity_lvl)
			return jsonify({'message': 'Successfully updated your user information'}), 200
		
		except sqlite3.Error as err:
        		print("Error: {}".format(err))

@app.route('/profile_picture', methods=['POST'])
@token_required
def upload_profile_picture():
		try:
			file = request.files['file']

			if validatePicture(file.filename) is not True:
				return jsonify({'message': 'File format is not accepted'}), 406

			if file:
				user_id = g.user.id
				filename = secure_filename(f"{user_id}_{file.filename}")
				file_path = os.path.join(app.config['picture_folder'], filename)
				file.save(file_path)

				update_user_profile_picture(get_db(), file_path, user_id)

				return jsonify({'message': 'Profile picture uploaded successfully'}), 200
		except Exception as e:
			print('Error uploading profile picture:', e)
			return 'Error uploading profile picture', 500
			
@app.route('/profile_picture', methods=['DELETE'])
@token_required
def delete_profile_picture():
    
        try:
            user_id = g.user.id
            db = get_db()
            file_path = select_user_profile_picture_path(db, user_id)

            if file_path and os.path.exists(file_path):
                os.remove(file_path)

            update_user_profile_picture(db, None, user_id)

            return jsonify({'message': 'Profile picture deleted successfully'}), 200

        except Exception as e:
            print('Error deleting profile picture:', e)
            return jsonify({'message': 'Error deleting profile picture'}), 500

@app.route('/meal/<meal_id>', methods=["DELETE"])
@token_required
def deleteMeal(meal_id):
	
		try:
			user_id = g.user.id

			meal_ids = select_users_meals(get_db(), user_id)
			if validateOwnership(meal_id, meal_ids) is True:

				delete_ingredients_from_meal_with_meal_id(get_db(), meal_id)
				delete_meal(get_db(), meal_id)

				
				return 200
			else:
				return jsonify({'message': 'User cant delete others meals'}), 401

		except sqlite3.Error as err:
        		print("Error: {}".format(err))
		
@app.route('/ingredient/<ingredient_id>', methods=["DELETE"])
@token_required
def deleteIngredient(ingredient_id):
	
		try:
			user_id = g.user.id

			ingredient_ids = select_users_ingredients(get_db(), user_id)
			if validateOwnership(ingredient_id, ingredient_ids) is True:
				
				ingredient_info = select_ingredient_by_id(get_db(), ingredient_id)
				meals_the_ingredient_were_in = select_meals_the_ingredient_were_in(get_db(), ingredient_id)

				update_total_macros_of_meal_ingredient_was_used_for(get_db(), meals_the_ingredient_were_in, ingredient_info)

				if(len(meals_the_ingredient_were_in) >= 1):
					delete_ingredient_from_meals_with_ingredient_id(get_db(), ingredient_id)

			
				delete_ingredient(get_db(), ingredient_id)

				
				return 200
			else:
				return 'User cant delete others ingredient', 401
			
		except sqlite3.Error as err:
        		print("Error: {}".format(err))

@app.route('/meal/<ingredient_id>/<meal_id>', methods=["DELETE"])
@token_required
def delete_ingredient_from_meal(ingredient_id, meal_id):
	
		try:
			user_id = g.user.id
		

			ingredient_ids = select_users_ingredients(get_db(), user_id)
			meal_ids = select_users_meals(get_db(), user_id)
			if validateOwnership(ingredient_id, ingredient_ids) is True and validateOwnership(meal_id, meal_ids) is True:

				ingredient_info = select_ingredient_by_id(get_db(), ingredient_id)
			
				update_total_macros_of_meal_ingredient_was_used_for(get_db(), meal_id, ingredient_info)
				
				delete_ingredient_from_specific_meal_with_ingredient_and_meal_id(get_db(), ingredient_id, meal_id)

				return 200
			else:
				return 'User cant delete others ingredient from  others meals', 401
		
		except sqlite3.Error as err:
			print("Error: {}".format(err))

@app.route('/calender/<calender_id>', methods=["DELETE"])
@token_required
def delete_meal_fromCalender(calender_id):
	
		try:
			user_id = g.user.id

			meal_ids = select_users_meals(get_db(), user_id)

			calender_ids = []
			for id in meal_ids:
				calender_ids += select_users_calender_entries(get_db(), id)

			if validateOwnership(calender_id, calender_ids) is True:
				delete_meal_from_calender(get_db(), calender_id)

				return 200
		
			else:
				return 'User cant delete others calender entries', 401
			
		except sqlite3.Error as err:
			print("Error: {}".format(err))
		
def findIngredients_for_meal(data):
	ingredients_for_meal = []
	for index in range(int(len(data)/8)):
		ingredients_for_meal.append({
			"ingredient_id": data[str(index) + '-ingredient_id'],
			"name": data[str(index) + '-name'],
			"amount": data[str(index) + '-amount'],
			"protein": float(data[str(index) + '-protein']),
			"calories": float(data[str(index) + '-calories']),
			"carbohydrates": float(data[str(index) + '-carbohydrates']),
			"fat": float(data[str(index) + '-fat']),
			"sugar": float(data[str(index) + '-sugar'])
		})

	return ingredients_for_meal

def addNewIngredientsAndUpdateOldOnes(ingredients_for_meal, meal_id):
	user_id = g.user.id

	for ingredient in ingredients_for_meal:
		if(ingredient['ingredient_id'] == ''):
			ingredient_id = add_ingredient(get_db(),
					user_id,
					ingredient['name'], 
					ingredient['amount'],
					ingredient['protein'], 
					ingredient['calories'], 
					ingredient['carbohydrates'],
					ingredient['fat'],
					ingredient['sugar'])
			add_ingredient_to_meal(get_db(), meal_id, ingredient_id)
		else:	
			update_ingredient(get_db(), 
					ingredient['ingredient_id'], 
					ingredient['name'], 
					ingredient['amount'],
					ingredient['protein'], 
					ingredient['calories'], 
					ingredient['carbohydrates'],
					ingredient['fat'],
					ingredient['sugar'])
			add_ingredient_to_meal(get_db(), meal_id, ingredient['ingredient_id'])

def updatePersonalMeal(ingredients_for_meal, meal_name, isMealInDatabase, meal_id):
	user_id = g.user.id

	meal_info = {
				"name": meal_name,
				"protein": 0,
				"calories": 0,
				"carbohydrates": 0,
				"fat": 0,
				"sugar": 0
			}

	#calculating total nutrients
	for nutrient in ingredients_for_meal:
		meal_info['protein'] += nutrient['protein']
		meal_info['calories'] += nutrient['calories']
		meal_info['carbohydrates'] += nutrient['carbohydrates']
		meal_info['fat'] += nutrient['fat']
		meal_info['sugar'] += nutrient['sugar']


	if(isMealInDatabase):
		update_personal_meal(get_db(), meal_id, meal_name, meal_info['protein'], meal_info['calories'], 
					meal_info['carbohydrates'], meal_info['fat'], meal_info['sugar'])
	else:
		return add_meal(get_db(), meal_name, user_id, round(meal_info['protein'], 2),round(meal_info['calories'], 2), 
					round(meal_info['carbohydrates'], 2), round(meal_info['fat'], 2), round(meal_info['sugar'], 2))


@app.route('/meal', methods=["POST"])
@token_required
def addMeal():
		try:
			data = request.get_json()

			meal_name = data['meal_name']

			result = isMealNameValid(meal_name)
			if result is not True:
				return result, 400

			data.pop('meal_name')
			ingredients_for_meal = findIngredients_for_meal(data)

			result = validateIngredients_for_meal(ingredients_for_meal)
			if result is not True:
				return result, 200

			meal_id = updatePersonalMeal(ingredients_for_meal, meal_name, False, None)
			
			addNewIngredientsAndUpdateOldOnes(ingredients_for_meal, meal_id)

			return 200
		except sqlite3.Error as err:
        		print("Error: {}".format(err))

@app.route('/meal/<meal_id>', methods=["PUT"])
@token_required
def editMeal(meal_id):
	
		try:
			user_id = g.user.id
			meal_ids = select_users_meals(get_db(), user_id)
			if validateOwnership(meal_id, meal_ids) is not True:
				return 'User cant edit others meals', 401

			data = request.get_json()

			if(len(data) == 1):
				update_personal_meal_name(get_db(), meal_id, data['meal_name'])
				return 200
			

			meal_name = data['meal_name']
			if isMealNameValid(meal_name) is not True:
				return 500

			data.pop('meal_name')

			ingredients_for_meal = findIngredients_for_meal(data)
			
			result = validateIngredients_for_meal(ingredients_for_meal)
			if result is not True:
				return result, 200

			updatePersonalMeal(ingredients_for_meal, meal_name, True, meal_id)
			addNewIngredientsAndUpdateOldOnes(ingredients_for_meal, meal_id)

			return 200
		except sqlite3.Error as err:
        		print("Error: {}".format(err))
		
@app.route('/calender/', methods=["POST"])
@token_required
def add_meal_to_given_date():
	
		try:
			data = request.json

			result = isCalenderDateAndTimeValid(data['date'], data['time'])
			if result is not True:
				return result, 406

			add_meal_to_calender(get_db(), data['id'], data['date'], data['time'])

			return 200
		except sqlite3.Error as err:
			print("Error: {}".format(err))
		

@app.route('/ingredient', methods=["POST"])
@token_required
def addIngredient():
	
		data = request.json

		name = data['name']
		amount = data['amount']
		protein = float(data['protein'])
		calories = float(data['calories'])
		carbohydrates = float(data['carbohydrates'])
		fat = float(data['fat'])
		sugar = float(data['sugar'])

		
		validate_ingredient = isIngredientValid(name, amount, protein, calories, carbohydrates, fat, sugar)

		if validate_ingredient is not True:
			return validate_ingredient, 500
		
		user_id = g.user.id
		add_ingredient(
			get_db(), 
			user_id, 
			name, 
			amount, 
			protein, 
			calories,
			carbohydrates, 
			fat,
			sugar)
		
		return 200
	
@app.route('/ingredient/<ingredient_id>', methods=["PUT"])
@token_required
def editIngredient(ingredient_id):
		ingredient_ids = select_users_ingredients(get_db(), g.user.id)
		if validateOwnership(ingredient_id, ingredient_ids) is not True:
			return 'User cant edit others ingredients', 401

		new_data = request.json 

		old_ingredient_info = select_ingredient_by_id(get_db(), ingredient_id)

		name = new_data['name']
		amount = new_data['amount']
		protein = float(new_data['protein'])
		calories = float(new_data['calories'])
		carbohydrates = float(new_data['carbohydrates'])
		fat = float(new_data['fat'])
		sugar = float(new_data['sugar'])

		validate_ingredient = isIngredientValid(name, amount, protein, calories, carbohydrates, fat, sugar)

		if validate_ingredient is not True:
			return validate_ingredient, 500
		
		update_ingredient(get_db(),
						ingredient_id,
						name,
						amount,
						protein, calories,
						carbohydrates,fat,
						sugar)
		
		macros_diff = {
			"protein": old_ingredient_info[4] - protein,
			"calories": old_ingredient_info[5] - calories,
			"carbohydrates": old_ingredient_info[6] - carbohydrates,
			"fat": old_ingredient_info[7] - fat,
			"sugar": old_ingredient_info[8] - sugar
		}

		personal_meal_ids = select_meals_the_ingredient_were_in(get_db(), ingredient_id)

		UPDATE_reCalcMacrosForMeals(get_db(), personal_meal_ids, macros_diff)

		return 200

##### GET #####
@app.route('/user_info/<user_id>', methods=["GET"])
@token_required
def user_info(user_id):
	if int(user_id) == g.user.id:
		tuple = select_info_for_user_by_id(get_db(), user_id)

		arr = {
			"name": tuple[0],
			"username": tuple[1],
			"email": tuple[3],
			"age": tuple[4],
			"profile_picture_link": tuple[5],
			"weight": tuple[6],
			"height": tuple[7],
			"gender": tuple[8],
			"activity_lvl": tuple[9],
		}
		return arr, 200
	else:
		return 'Unauthorized', 401

@app.route('/personal_meals/<user_id>', methods=["GET"])
@token_required
def personal_meals(user_id):
	if int(user_id) == g.user.id:
		return select_personal_meals_with_ingredients(get_db(), user_id), 200
	else:
		return 'Unauthorized', 401

@app.route('/personal_ingredients/<user_id>', methods=["GET"])
@token_required
def personal_ingredients(user_id):
	if int(user_id) == g.user.id:
		return select_personal_ingredients(get_db(), user_id), 200
	else:
		return 'Unauthorized', 401
	
@app.route('/meal_calender/<user_id>/<date>', methods=["GET"])
@token_required
def meal_calender(user_id, date):
	if int(user_id) == g.user.id:
		return select_meal_calender(get_db(), user_id, date), 200
	else:
		return 'Unauthorized', 401

@app.route('/average_macros/<user_id>', methods=["GET"])
@token_required
def average_macros(user_id):
	if int(user_id) == g.user.id:
		return select_average_macros(get_db(), user_id), 200
	else:
		return 'Unauthorized', 401
		
if __name__ == '__main__':
	app.run(debug=True)


