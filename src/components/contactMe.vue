<template>

    <div class="d-flex justify-content-around">
        <p class="contact"> 
            Please contact at joachim.tislov@gmail.com 

            <font-awesome-icon class="arrow" :icon="['fas', 'arrow-right']" />

            <a href="mailto:Joachim.tislov@gmail.com"><img class="gmail" src="@\\assets\\images\\gmail.png" /></a>

        </p>
    </div>

</template>

<style scoped>

.contact {
    text-decoration: none;
    color: rgb(216, 189, 189);

    margin-top: 3%;

    font-size: clamp(0.7rem, 2.5vw, 2rem);
}

.gmail {
    margin-top: -5px;
    margin-left: 5px;

    width: 2em;
    height: auto;
}

</style>