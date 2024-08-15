export function handleImageUpload (event , user){
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      user.value.avatar = file;
    } else {
        event.target.value = "";
        throw new Error("Selected file is not an image!");
    }
}

export async function formSubmit(url, user, $fetch, $toast, router, errors, isUpdateData = false ){
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    if(isUpdateData){
        formData.append("is_active", user.is_active ? "1" : "0");
        formData.append("_method", "PUT");
    }

    if (user.avatar && typeof user.avatar != "string") {
        formData.append("avatar", user.avatar);
    }


    try {
        const response = await $fetch(url, {
          method: "POST",
          body: formData,
        });
        errors.value = {};
        $toast.success(response.message);
        router.push({ path: "/" });
      } catch (err) {
        $toast.error("Something went wrong!");
        errors.value = err.data.errors;
      }
}

export function errorInputClass (errors , field){
    return errors[field]
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

export async function deleteUserInfo (url , $fetch , $toast ,refetchUsers , toggleDeleteModal){
    try{
        const response = await $fetch(
            url,
             { method: "delete" }
         );
         $toast.success(response.message);
         await refetchUsers();
         toggleDeleteModal();
    }catch(error){
      $toast.success(error.data.message);
      await refetchUsers();
      toggleDeleteModal();
    }
    
}