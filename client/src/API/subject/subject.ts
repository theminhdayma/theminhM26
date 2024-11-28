import { subjectInstance } from "../../utils/instances";
import baseURL from "../baseURL";

export const getAllSubject = async () => {
  try {
    const res = await subjectInstance.get(`${baseURL}/subjectList`);
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const addSubjectToBackend = async (newSubject: any) => {
    try {
      const res = await subjectInstance.post(`${baseURL}/subjectList`, newSubject);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

export const editSubjectInBackend = async (updatedSubject: any) => {
    try {
      const res = await subjectInstance.put(`${baseURL}/subjectList/${updatedSubject.id}`, updatedSubject);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };