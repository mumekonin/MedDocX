import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../api/contact.api";

export const useSubmitContact = () =>
  useMutation({ mutationFn: submitContactForm });