import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators"; 
import { environment } from "src/environments/environment";
@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    
   
    constructor(private route : Router,private toastr : ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //For displaying the progress bar
        //this.loader.isLoading.next(true);

        
        if(localStorage.getItem(environment.tokenKeyName) != null){
            const clonedReq = req.clone({
                headers : req.headers.set('Authorization', 'Bearer '+localStorage.getItem(environment.tokenKeyName))
            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => {},
                    error => {
                        if(error.status == 401){
                            localStorage.removeItem(environment.tokenKeyName);
                            this.toastr.info("Login again","Session expired");
                            this.route.navigate(['']);
                        }
                    }
                ),
                finalize(
                    ()=>{
                        //this.loader.isLoading.next(false);
                    }
                )
            );
        }
        else{
            //this.loader.isLoading.next(false);
            return next.handle(req.clone());
        }

        
    }
}