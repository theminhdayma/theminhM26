import { coursesInstance } from "../../utils/instances";
import baseURL from "../baseURL";

export const getAllCourses = async () => {
  try {
    const res = await coursesInstance.get(`${baseURL}/courses`);  // Lấy dữ liệu từ API userList
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const AddCourses = async (data: any) => {
  try {
    const res = await coursesInstance.post(`${baseURL}/courses`, data);  // Gọi API thêm khóa học
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const updateCourses = async (data: any) => {
  try {
    const res = await coursesInstance.patch(`${baseURL}/courses`, data);  // Lấy dữ liệu từ API userList
    return res.data;
  } catch (err) {
    alert(err);
  }
};

// Gọi API để lấy khóa học theo ID
export const getCourseById = async (id: number) => {
  const response = await coursesInstance.get(`${baseURL}/${id}`);
  return response.data;
};

// Gọi API để cập nhật khóa học bằng PATCH
export const updateCourse = async (id: number, updatedData: any) => {
  const response = await coursesInstance.patch(`${baseURL}/${id}`, updatedData);
  return response.data;
};

// Xóa khóa thi
export const deleteCourses = async (id: number) => {
  const response = await coursesInstance.delete(`${baseURL}/${id}`);
  return response.data;
};