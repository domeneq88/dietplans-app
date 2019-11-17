import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_PRODUCT
export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    product
  });
  
  export const startAddProduct = (productData = {}) => {
    return (dispatch) => {
      const {
        productName = '',
        productMakroB = 0,
        productMakroW = 0,
        productMakroT= 0,
        sumaKcal = 0,
        amount = 0,
        createdAt = 0
      } = productData;
      const product = { productName, productMakroB, productMakroW, 
                        productMakroT, sumaKcal, amount, createdAt };
  
      return database.ref('products').push(product).then((ref) => {
        dispatch(addProduct({
          id: ref.key,
          ...product
        }));
      });
    };
  };


// SET_PRODUCTS
export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  products
});

export const startSetProducts = () => {
  return (dispatch) => {
      return database.ref('products').once('value').then((snapshot) => {
        const products = [];
  
        snapshot.forEach((childSnapshot) => {
          products.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setProducts(products));
      });
  };
};
