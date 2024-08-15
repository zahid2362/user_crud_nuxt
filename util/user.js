export function handleImageUpload (event , user){
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      user.value.avatar = file;
    } else {
        event.target.value = "";
        throw new Error("Selected file is not an image!");
    }
}

export async function formSubmit(url , user, $fetch, $toast, router, errors ){
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
  
    if (user.avatar) {
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