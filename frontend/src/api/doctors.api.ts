import axiosClient from "./axiosClient";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  bio?: string;
  order: number;
  isActive: boolean;
}

export interface DoctorFormInput {
  name: string;
  specialty: string;
  bio?: string;
  isActive?: boolean;
  photo?: FileList;
}

export const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await axiosClient.get("/doctors");
  return data;
};

const buildDoctorFormData = (input: DoctorFormInput): FormData => {
  const formData = new FormData();
  formData.append("name", input.name);
  formData.append("specialty", input.specialty);
  if (input.bio) formData.append("bio", input.bio);
  if (input.isActive !== undefined) formData.append("isActive", String(input.isActive));
  if (input.photo && input.photo.length > 0) formData.append("photo", input.photo[0]);
  return formData;
};

export const createDoctor = async (input: DoctorFormInput): Promise<Doctor> => {
  const { data } = await axiosClient.post("/doctors", buildDoctorFormData(input), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateDoctor = async (id: string, input: DoctorFormInput): Promise<Doctor> => {
  const { data } = await axiosClient.put(`/doctors/${id}`, buildDoctorFormData(input), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteDoctor = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/doctors/${id}`);
  return data;
};