import Swal from 'sweetalert2'

export const SwalError = (text: string = 'Error') => {
  return Swal.fire({
    title: 'Error!',
    text: text,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

export const SwalWarning = async (text: string = 'Warning', textButton: string = 'OK', cancel: boolean = false) => {
  return await Swal.fire({
    title: 'Peringatan!',
    text: text,
    icon: 'warning',
    confirmButtonText: textButton,
    showCancelButton: cancel,
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) return true
    else return false
  })
}

export const SwallSuccess = async () => {
  return await Swal.fire({
    icon: "success",
    title: "Pesan Terkirim",
    text: "Kartu berhasil terkirim!",
    showCancelButton: true,
    confirmButtonText: "Riwayat",
    cancelButtonText: "Beranda"
  }).then((result) => {
    return result.isDismissed
  })
}

export const SwallInfo = () => {
  Swal.fire({
    icon: 'info',
    text: "Kartu akan dikirim melalui WhatsApp.",
    timer: 1000,
    showConfirmButton: false,
  })
}

export const SwalConfirm = async ({ title = 'Are you sure want to cancel?', text = 'any change will not be saved' }: { title?: string; text?: string }): Promise<boolean> => {
  return await Swal.fire({
    title,
    text,
    icon: 'warning',
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    confirmButtonColor: '#3085d6',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) return true
    else return false
  })
}