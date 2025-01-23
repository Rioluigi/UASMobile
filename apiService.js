import axios from 'axios';

const API_URL = 'https://67371fffaafa2ef22232bc52.mockapi.io/'; // Ganti dengan endpoint mockAPI Anda

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products`, product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
