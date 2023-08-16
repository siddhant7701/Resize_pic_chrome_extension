const form = document.querySelector('#my-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const photoField = formData.get('photo');
    const dataUri = await dataUriFromFormField(photoField);

    const imgSize = parseInt(document.getElementById('imgerq').value);
    const imgreq = Math.max(imgSize, 1);
    const imgEl = document.createElement('img');
    imgEl.addEventListener('load', () => {
        const resizedDataUri = resizeImage(imgEl, imgreq);
        document.querySelector('#img-preview').src = resizedDataUri;

        const downloadLink = document.querySelector('#download-link');
        downloadLink.href = resizedDataUri;
        downloadLink.download = 'resized_image.png';
        downloadLink.style.display = 'block';
    });
    imgEl.src = dataUri;
});
async function dataUriFromFormField(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.readAsDataURL(field);
    });
}

function resizeImage(imgEl, size) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = size;
    ctx.drawImage(imgEl, 0, 0, size, size);
    return canvas.toDataURL();
}
