import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      console.error("Network error:", error.message);
      // You can show a toast notification here
    }
    
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page nếu đang ở client-side
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }
    
    // Log error for debugging
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    }
    
    return Promise.reject(error);
  }
);

// API Service wrapper for easier usage
export const apiService = {
  dictionary: {
    searchWords: async (params: { word: string }) => {
      return api.get("/dictionary", { params });
    },
    getWordById: async (id: string) => {
      return api.get(`/dictionary/word/${id}`);
    },
    getCategories: async () => {
      return api.get("/dictionary/categories");
    },
    getWordsByCategory: async (category: string) => {
      return api.get(`/dictionary/category/${category}`);
    },
  },
  exercises: {
    getRandom: async () => {
      return api.get("/exercises/random");
    },
    getAll: async () => {
      return api.get("/exercises");
    },
    getById: async (id: string) => {
      return api.get(`/exercises/${id}`);
    },
  },
  translations: {
    create: async (data: {
      inputText: string;
      outputSign: string;
      direction: "text-to-sign" | "sign-to-text";
    }) => {
      return api.post("/translations", data);
    },
    getUserTranslations: async () => {
      return api.get("/translations");
    },
    delete: async (id: string) => {
      return api.delete(`/translations/${id}`);
    },
  },
  auth: {
    updateProfile: async (data: { name?: string; email?: string }) => {
      return api.put("/users/profile", data);
    },
    changePassword: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      return api.put("/users/password", data);
    },
    getMe: async () => {
      return api.get("/users/me");
    },
  },
};

export default api;

