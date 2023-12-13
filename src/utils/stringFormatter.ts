export function formatDDMMYY(date:Date) {
  const date2 = new Date(date);
  const day = date2.getDate();
  const month = date2.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cộng thêm 1.
  const year = date2.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatCurrencyVietnamese(amount: number): string {
  if (isNaN(amount)) {
    return "Số tiền không hợp lệ";
  }
return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
