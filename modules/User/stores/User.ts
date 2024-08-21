import type{User , UserCreate, SingleUser, ValidationErrors} from './../interface/User' 
export const useUserListStore = defineStore('userList',{
        state: () => {
            return {
                per_page:  10 as number,
                total: 0 as number ,
                showDeleteWarning: false as boolean,
                selectedUserId: null as number | null,
                page: 1 as number,
                users: [] as User[],

                errors:{} as ValidationErrors,

                createUser:{
                    name: "",
                    email: "",
                    password: "",
                    avatar: null,
                } as UserCreate,

                errorFormClass: [
                    "bg-red-50",
                    "border-red-500",
                    "text-red-900",
                    "placeholder-red-700",
                    "focus:ring-red-500",
                    "focus:border-red-500",
                  ] as Array<string>,

                  user:{} as SingleUser
            }
        },
        getters:{
            getUserList(state){
                return state.users
            },
            getCreateUserData(state){
                return state.createUser
            },
            getErrors(state){
                return state.errors
            },
            getErrorFormClass(state){
                return state.errorFormClass
            },
            getUserData(state){
                return state.user
            }
        },
        actions:{
            setUsers(users: User[]):void {
                this.users = users;
            },
            setTotalPage(total: number , page: number):void {
                this.total = total;
                this.page = page;
            },
            changePage( page: number):void{
                this.page = page;
            },
            toggleDeleteModal(userId: number | null = null):void {
                this.selectedUserId = userId;
                this.showDeleteWarning = !this.showDeleteWarning;
            },
            setErrors(errors: ValidationErrors):void {
                this.errors = errors;
            },
            setAvatar(file:File , is_update:boolean ):void{
                if(is_update){
                    this.user.avatar = file
                }else{
                    this.createUser.avatar = file
                }
            },
            setUserData(user: SingleUser):void{
                this.user = user
            },
            clearErrors():void{
                this.errors = {}
            }
        }
})


