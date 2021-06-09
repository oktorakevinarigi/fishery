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
  areaId: number,
  sizeId: number,
  form: {
    komoditas: string;
    areaId: number;
    sizeId: number;
    price: string;
  }
}