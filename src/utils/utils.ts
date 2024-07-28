import { useErrorStore } from '@/stores/error-store';
import type ResponseApi from '@/interfaces/response-api';
import type { AxiosError } from 'axios';
import type { ErrorCode } from '@/enums/error-code';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/;
  return regex.test(name);
}

export function isDaytimeNow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 6 && hour < 18;
}

export function formatDate(data: Date): string {
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString().slice(-2);
  return `${dia}/${mes}/${ano}`;
}

export function formatFullDate(data: Date): string {
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear().toString();
  const hours = data.getHours().toString().padStart(2, '0');
  const minutes = data.getMinutes().toString().padStart(2, '0');
  const seconds = data.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const formatNumber = (number: number): string => {
  number = +number;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export function formatCompactNumber(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
  return formatter.format(number);
}

export const formatBreakLines = (text: string): string => {
  text = text.replace(/\n/g, '<br>');
  return text;
};

export function getError(e: unknown): string {
  const axiosError = e as AxiosError;
  const error = axiosError.response;
  if (!error) {
    return `Erro desconhecido, entre em contato com o administrador.`;
  }
  const responseApi = error.data as ResponseApi;
  if (Array.isArray(responseApi.message)) {
    return responseApi.message.join(', ');
  }
  return responseApi.message;
}

export function showError(code: ErrorCode, e: unknown): void {
  let errorMessage;
  const axiosError = e as AxiosError;
  const error = axiosError.response;
  if (error) {
    const responseApi = error.data as ResponseApi;
    if (Array.isArray(responseApi.message)) {
      errorMessage = responseApi.message.join(', ');
      return;
    }
    errorMessage = responseApi.message;
  } else {
    errorMessage = axiosError.message;
  }
  const errorStore = useErrorStore();
  errorStore.setErroApi({ code, message: errorMessage });
}
