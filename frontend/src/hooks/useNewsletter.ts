import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "../api/newsletter.api";

export const useSubscribeNewsletter = () =>
  useMutation({ mutationFn: subscribeNewsletter });