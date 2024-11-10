import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { environment } from "../../environments/environment.development";

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const loggedUser = localStorage.getItem(`${environment.PROYECT_NAME}_loggedUser`);
    if (loggedUser !== null) {
        return true;
    }
    else {
        router.navigate(['/auth']);
        return false;
    }
}