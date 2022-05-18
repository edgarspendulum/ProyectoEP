import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Toast from "../helpers/Toast";

import { types } from "../type";

export const listDataProduct = (data) => {
  return async (dispatch) => {
    try {
      if (data) {
        await dispatch(productDataList(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productDataList = (data) => ({
  type: types.product,
  payload: data,
});

export const addProduct = (resData) => {
  return async (dispatch) => {
    try {
      const { id } = await addDoc(collection(db, "serchs"), {
        ...resData,
      });

      const data = { ...id, ...resData };

      if (data) {
        dispatch(productAdd(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productAdd = (data) => ({
  type: types.productAdd,
  payload: data,
});

export const editProduct = (data) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "serchs", data.id), data);
      dispatch(productEdit(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productEdit = (data) => ({
  type: types.productEdit,
  payload: data,
});

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "serchs", id));
      dispatch(productDelete(id));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const productDelete = (id) => ({
  type: types.productDelete,
  payload: id,
});

export const productActiveOrInactive = (data) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "serchs", data.id), { es: data.es });
      dispatch(activeOrInactiveProduct(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const activeOrInactiveProduct = (data) => ({
  type: types.productEdit,
  payload: data,
});

export const activeProductCart = (data) => {
  return async (dispatch, getState) => {
    const { activeCartSelect } = await getState().product;
    try {
      const match = await activeCartSelect.find((obj) => obj.id === data.id);
      if (match) {
        return Toast("Product already added to cart", "error", 5000);
      }

      Toast("Producto agregado al carrito", "success", 5000);
      dispatch(cartProductActive(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const cartProductActive = (data) => ({
  type: types.productActiveCart,
  payload: data,
});

export const saveProductCart = (data) => {
  return async (dispatch, getState) => {
    const { saveCartSelect } = await getState().product;
    try {
      const match = await saveCartSelect.find((obj) => obj?.id === data.id);
      if (match) {
        dispatch(deleteProductSave(data.id));
      } else {
        dispatch(cartProductSave(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const cartProductSave = (data) => ({
  type: types.productSaveCart,
  payload: data,
});

export const deleteProductSave = (id) => ({
  type: types.productDeleteSave,
  payload: id,
});

export const cartSaveLatest = (data) => {
  return async (dispatch, getState) => {
    const { latestCartSelect } = await getState().product;
    try {
      const match = await latestCartSelect.find((obj) => obj.id === data.id);
      if (!match) {
        dispatch(LatestSaveCart(data));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

const LatestSaveCart = (data) => ({
  type: types.productSaveLatest,
  payload: data,
});

export const serchProductList = (filtro) => {
  return async (dispatch) => {
    try {
      if (filtro.length > 0) {
        dispatch(listProductSerch(filtro));
      }
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};

export const listProductSerch = (data) => ({
  type: types.serchList,
  payload: data,
});

export const listProductSerchClose = () => ({
  type: types.emptySerch,
});

export const saveSale = (data) => {
  return (dispatch) => {
    try {
      data.map(async (d) => {
        if (d.sale?.id === d.product?.uid) {
          await addDoc(collection(db, "users", d.sale?.id, "sales"), {
            sale: d.sale,
            buy: d.buy,
            process: d.process,
            product: d.product,
            lim: d.lim,
          });
        }

        await addDoc(collection(db, "users", d.uidC, "buys"), {
          sale: d.sale,
          buy: d.buy,
          process: d.process,
          product: d.product,
          lim: d.lim,
        });
      });

      dispatch(activeProduct(data));
    } catch (error) {
      Toast("Al parecer hay un error", "error", 5000);
    }
  };
};
export const activeProduct = (data) => ({
  type: types.productActive,
  payload: data.length > 0 ? data : [],
});

export const deleteProductCart = (id) => ({
  type: types.productDeleteCart,
  payload: id,
});

export const closeActive = () => ({
  type: types.closeActive,
});
export const closeRevert = () => ({
  type: types.productRevert,
});
