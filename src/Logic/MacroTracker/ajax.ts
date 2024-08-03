import { routeToLogin } from "./routeToLogin";

export async function fetchResource(method: string, data: string, url: string, alert_div: HTMLElement | null, auth: string | undefined) {
    if (!auth) {
        routeToLogin()
    } else {
        try {
            const response = await fetch(import.meta.env.VITE_LOCAL_API_WEB_URL + url, {
                method: method,
                body: data,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': auth
                }
            });
            
            if (!response.ok) {
                const message = (await response.json()).message;
                
                if (alert_div) {

                    alert_div.innerHTML = message 
                    alert_div.className = "alert alert-danger"
                } 
            }
            
            if (response.status == 401) {
                localStorage.removeItem('token')
                routeToLogin()
            }

            return response
            
        } catch(Error) {
            console.log('Fetch failed: ', Error)
        }
    }
} 