const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  const product = btn.closest('article');

  fetch('/admin/product/' + productId, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  })
  .then(result => {
    return result.json()
  })
  .then(data => {
    product.remove();
  })
  .catch(error => {
    console.log(error);
  })
}

