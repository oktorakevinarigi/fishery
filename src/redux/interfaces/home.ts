export default interface IHome {
  isLoading: boolean;
  sourceArea: [];
  sourceSize: [];
  list: {
    uuid: string;
    area_kota: string;
    area_provinsi: string;
    komoditas: string;
    price: string;
    size: string;
  }[];
  komoditas: string;
  areaId: number | null;
  sizeId: number | null;
  form: {
    komoditas: string;
    areaId: number | null;
    sizeId: number | null;
    price: string;
  }
}