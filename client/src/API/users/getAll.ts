import { usersInstance } from "../../utils/instances";
import baseURL from "../baseURL";

export const getAllUser = async () => {
  try {
    const res = await usersInstance.get(`${baseURL}/userList`);  // Lấy dữ liệu từ API userList
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const blockUser = async (id: number) => {
  try {
    const res = await usersInstance.patch(`${baseURL}/userList/${id}`, { lock: false }); // Chỉnh sửa tham số đúng format
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export const unBlockUser = async (id: number) => {
  try {
    const res = await usersInstance.patch(`${baseURL}/userList/${id}`, { lock: true }); // Chỉnh sửa tham số đúng format
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export const sortUsersByName = async (string: string) => {
  try {
    const res = await usersInstance.get(`${baseURL}/userList?sort=name&order=${string}`); // Thay đổi URL tùy theo cách bạn xử lý sắp xếp ở backend
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export const searchUsers = async (searchTerm: string) => {
  try {
    const res = await usersInstance.get(`${baseURL}/userList?search=${searchTerm}`); // Encode tham số tìm kiếm
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export const fetchUsersWithPagination = async (limit: number, page: number) => {
  try {
    const res = await usersInstance.get(`${baseURL}/userList?limit=${limit}&page=${page}`);
    return res.data;
  } catch (err) {
    alert(err);
  }
}
