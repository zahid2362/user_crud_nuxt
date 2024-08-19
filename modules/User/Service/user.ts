import type { User, UserList, GeneralResponse, UserCreate,UserUpdate, ValidationErrors, ErrorResponse ,ShowResponse} from "./../interface/User";
import type { Router } from 'vue-router';

class UserService {
    async index(url: string, $toast: any , userStore:any):Promise<void>{
        try {
            const res:Response = await fetch(`${url}?per_page=${userStore.per_page}&page=${userStore.page}`);
            if(res.ok){
                let response:UserList = await res.json()
                if (response.success) {
                    userStore.setUsers(response.users.data)
                    userStore.setTotalPage(response.users.total,response.users.current_page)
                }
            }else{
                let errorResponse:GeneralResponse = await res.json()
                $toast.error(errorResponse?.message);
            }
          
        } catch (error:unknown) {            
            this.errorHandle(error ,  $toast)
        }
    }

    async delete(url: string , $toast:any) :Promise<void>{
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

    async create(user: UserCreate , errors:Ref<ValidationErrors> , $toast:any , url: string , router:Router):Promise<void>{
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
                console.log(response);
                $toast.success(response?.message);
                router.push({ path: "/user" });
            }else{
                let errorResponse:ErrorResponse = await res.json()
                errors.value =errorResponse.errors
                $toast.error(errorResponse?.message);
            }
        } catch (error:unknown) {
           this.errorHandle(error, $toast)
        }
    }

    async update(user: UserUpdate , errors:Ref<ValidationErrors> , $toast:any , url: string , router:Router):Promise<void>{
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
                console.log(response);
                $toast.success(response?.message);
                router.push({ path: "/user" });
            }else{
                let errorResponse:ErrorResponse = await res.json()
                errors.value = errorResponse.errors
                $toast.error(errorResponse?.message);
            }
        } catch (error:unknown) {
           this.errorHandle(error, $toast)
        }
    }

    async show(url: string, user:Ref<UserUpdate> , $toast: any , router:Router):Promise<void>{
        try {
            const res:Response = await fetch(url);
            if(res.ok){
                let response:ShowResponse = await res.json()
                if (response.success) {
                    user.value = response.data;
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

    handleImageUpload(event: Event , user: Ref<UserCreate> | Ref<UserUpdate>, $toast: any ):void{
        const target = event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : null;
        if (file && file.type.startsWith("image/")) {
          user.value.avatar = file;
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
        if (typeof error === "object" && error !== null && "data" in error) {
            let errResponse = error.data as GeneralResponse;
            $toast.error(errResponse?.message);
        } else {
            $toast.error("An unexpected error occurred");
        }
    }
}

export const userService: UserService = new UserService()