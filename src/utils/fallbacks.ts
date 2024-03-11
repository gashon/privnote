import { errorNotification, successNotification } from "@/lib";


export function fallbackCopyTextToClipboard(text: string, {
  successMessage,
  errorMessage
}: {
  successMessage?: string;
  errorMessage?: string;
}) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    successNotification(successMessage ?? 'Copied to clipboard');
  } catch (err){
    errorNotification(errorMessage ?? 'Failed to copy to clipboard');
  }

  document.body.removeChild(textArea);
}

