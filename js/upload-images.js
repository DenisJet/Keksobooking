const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

const uploadAvatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const uploadImages = document.querySelector('#images');
const imagesPreviewContainer = document.querySelector('.ad-form__photo');

// Загрузка аватара

uploadAvatar.addEventListener('change', () => {
  const file = uploadAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    })

    reader.readAsDataURL(file);
  }
})

// Загрузка фотографий

uploadImages.addEventListener('change', () => {
  const file = uploadImages.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = document.createElement('img');
      image.src = reader.result;
      image.style.width = '100px';
      image.style.height = '100px';
      imagesPreviewContainer.appendChild(image);
    })

    reader.readAsDataURL(file);
  }
})
