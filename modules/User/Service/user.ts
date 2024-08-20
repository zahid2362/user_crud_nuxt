import type { UserList, GeneralResponse, ValidationErrors, ErrorResponse ,ShowResponse, UserServiceInterface} from "./../interface/User";
import type { Router } from 'vue-router';

class UserService implements UserServiceInterface{

    async index(url: string, $toast: any , userListStore:any):Promise<void>{
        try {
            const res:Response = await fetch(`${url}?per_page=${userListStore.per_page}&page=${userListStore.page}`);
            if(res.ok){
                let response:UserList = await res.json()
                if (response.success) {
                    userListStore.setUsers(response.users.data)
                    userListStore.setTotalPage(response.users.total,response.users.current_page)
                }
            }else{
                let errorResponse:GeneralResponse = await res.json()
                $toast.error(errorResponse?.message);
            }
          
        } catch (error:unknown) {            
            this.errorHandle(error ,  $toast)
        }
    }

    async create(url: string, $toast: any, userStore: any, router: Router):Promise<void>{
        const user = userStore.getCreateUserData;
        const formData = new FormData();
        
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
      
        if (user.avatar && typeof user.avatar != "string") {
          formData.append("avatar", user.avatar);
        }  

        try {
            const res: Response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if(res.ok){
                let response = await res.json()
                $toast.success(response?.message);
                router.push({ path: "/user" });
            }else{
                let errorResponse:ErrorResponse = await res.json()
                userStore.setErrors(errorResponse.errors)
                $toast.error(errorResponse?.message);
            }
        } catch (error:unknown) {            
           this.errorHandle(error, $toast)
        }
    }

    async show(url: string, $toast: any, userStore: any, router: Router):Promise<void>{
        try {
            const res:Response = await fetch(url);
            if(res.ok){
                let response:ShowResponse = await res.json()
                if (response.success) {
                    userStore.setUserData(response.data)
                }else{
                    $toast.error(response?.message);
                    router.push({ path: "/user" });
                }
            }else{
                let errorResponse:GeneralResponse = await res.json()
                $toast.error(errorResponse?.message);
                router.push({ path: "/user" });
            }
          
        } catch (error:unknown) {
            this.errorHandle(error ,  $toast)
        }
    }

    async update(url: string, $toast: any, userStore: any, router: Router):Promise<void>{
        const user = userStore.getUserData;
        const formData = new FormData();

        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("is_active", user.is_active ? "1" : "0");
        formData.append("_method", "PUT");

        if(user.password != null){
            formData.append("password", user.password);
        }
      
        if (user.avatar && typeof user.avatar != "string") {
          formData.append("avatar", user.avatar);
        }          

        try {
            const res: Response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if(res.ok){
                let response = await res.json()
                $toast.success(response?.message);
                router.push({ path: "/user" });
            }else{
                let errorResponse:ErrorResponse = await res.json()
                userStore.setErrors(errorResponse.errors)
                $toast.error(errorResponse?.message);
            }
        } catch (error:unknown) {
           this.errorHandle(error, $toast)
        }
    }

    async delete(url: string, $toast: any) :Promise<void>{
        try {
            const res:Response = await fetch(
              url,
              { method: "delete" }
            );
            if(res.ok){
                let response:GeneralResponse = await res.json()
                if (response.success) {
                    $toast.success(response.message);
                } else {
                    $toast.error(response.message);
                }
            }
            
          } catch (error) {
            this.errorHandle(error, $toast)
          }
    }

    handleImageUpload(event: Event , userStore:any, $toast: any , is_update:boolean = false):void{
        const target = event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : null;
        if (file && file.type.startsWith("image/")) {
            userStore.setAvatar(file , is_update)
        } else {
          target.value = "";
          $toast.error("Selected file is not an image!");
        }
    }

    getErrorInputClass(errors:ValidationErrors , field: keyof ValidationErrors):Array<string>{
        return errors[field] && errors[field].length == 1
        ? [
            "bg-red-50",
            "border-red-500",
            "text-red-900",
            "placeholder-red-700",
            "focus:ring-red-500",
            "focus:border-red-500",
            ]
        : [];
    }

    errorHandle(error:unknown ,  $toast: any):void{
        if (error !== null && typeof error === "object" && "data" in error) {
            let errResponse = error.data as GeneralResponse;
            $toast.error(errResponse?.message);
        } else {
            $toast.error("An unexpected error occurred");
        }
    }
}

export const userService: UserService = new UserService()