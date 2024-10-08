import type { Router } from 'vue-router';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    is_active: boolean;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
}

export interface SingleUser {
  id: number;
  name: string;
  email: string;
  password: string|null;
  avatar: string | null | File;
  is_active: boolean;
}

export interface TableProps {
    users: User[];
}


export interface TableEmit {
  (event: "toggleDeleteModal", id: number): void;
}
export interface UserList {
    message: string;
    success: boolean;
    data:{
      users: {
        total: number;
        current_page: number;
        data: User[];
      };
    }
  }

 export interface ValidationErrors {
    email?: string[];
    password?: string[];
    avatar?: string[];
    name?: string[];
    is_active?: string[];
  }

export interface GeneralResponse {
    message: string;
    success: boolean;
}

export interface ShowResponse {
  data: SingleUser;
  success: boolean;
  message: string | null;
}

export interface ErrorResponse {
  message: string;
  success: boolean;
  errors: ValidationErrors;
}

export interface PaginationProps {
    total: number;
    page: number;
    per_page: number;
  }

 export interface PaginationEmits {
    (event: "change", pageNo: number): void;
  }

  export interface ErrorMessageProps {
    message: string;
  }

  export interface DeleteModalProps {
    visible: boolean;
  }

  export interface DeleteModalEmits {
    (event: "close" | "confirm"): () => void;
  }
  export interface UserServiceInterface{
    index(url: string, $fetch: any, $toast: any, userListStore: any): Promise<void>;
    create(url: string, $fetch: any, $toast: any, userStore: any, router: Router): Promise<void>;
    show(url: string, $toast: any, userStore: any, router: Router): Promise<void>;
    update(url: string, $toast: any, userStore: any, router: Router): Promise<void>;
    delete(url: string, $fetch: any, $toast: any): Promise<void>;
    handleImageUpload(event: Event,  $toast: any, is_update: boolean): void;
    getErrorInputClass(errors: ValidationErrors, field: keyof ValidationErrors): Array<string>;
    errorHandle(error: unknown, $toast: any): void;
  }