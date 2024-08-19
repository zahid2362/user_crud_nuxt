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

export interface UserList {
    message: string;
    success: boolean;
    users: {
      total: number;
      current_page: number;
      data: User[];
    };
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
    visible: Boolean;
  }

  export interface DeleteModalEmits {
    (event: "close"): () => void;
    (event: "confirm"): () => void;
  }
  

