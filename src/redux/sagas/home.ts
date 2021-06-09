import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { RootStateOrAny } from 'react-redux'


import * as types from '../types'
import { SwallSuccess } from '../../utils/Sweetalert'
import { GET, DELETE, PUT } from '../../services/API'
import { url, area, size, list } from '../../config'

const getStateHome = (state: RootStateOrAny) => state.Home

const funcMapList = (raw: { uuid: string; area_kota: string; area_provinsi: string; komoditas: string; price: string; size: string; }) => {
  return {
    uuid: raw.uuid ? raw.uuid : "",
    area_kota: raw.area_kota ? raw.area_kota : "",
    area_provinsi: raw.area_provinsi ? raw.area_provinsi : "",
    komoditas: raw.komoditas ? raw.komoditas : "",
    price: raw.price ? raw.price : "",
    size: raw.size ? raw.size : "",
  }
}

export function* fetchGetMaster(): Generator {
  try {
    const resArea: any = yield call(GET, url + area)
    const resSize: any = yield call(GET, url + size)
    const funcMapArea = (raw: { city: string, province: string }, idx: number) => {
      return {
        id: idx + 1,
        label: raw.city ? raw.city : "",
        city: raw.city ? raw.city : "",
        province: raw.province ? raw.province : "",
      }
    }
    const funcMapSize = ({ size }: { size: string }, idx: number) => {
      return { id: idx + 1, label: size ? size : "", }
    }
    const data = {
      sourceArea: resArea.res.map(funcMapArea),
      sourceSize: resSize.res.map(funcMapSize),
    }
    return data
  } catch (error) {

  }
}

export function* fetchData(): Generator {
  try {
    yield put({ type: types.HOME_SET_LOADER, value: true })
    const getMaster: any = yield call(fetchGetMaster)
    const resList: any = yield call(GET, url + list)

    const data = {
      sourceArea: getMaster.sourceArea,
      sourceSize: getMaster.sourceSize,
      list: resList.res.map(funcMapList),
      isLoading: false
    }
    yield put({ type: types.HOME_FETCH_DATA_GLOBAL, data })
  } catch (err) {
    yield put({ type: types.HOME_SET_LOADER, value: false })
    throw err
  }
}

export function* fetchSearch(): Generator {
  try {
    yield put({ type: types.HOME_SET_LOADER, value: true })
    const stateHome: any = yield select(getStateHome)
    let filter = {}
    if (stateHome.areaId !== 0) {
      const findArea = stateHome.sourceArea.find((x: any) => x.id === stateHome.areaId)
      filter = { area_kota: findArea.label }
    }
    if (stateHome.sizeId !== 0) {
      const findSize = stateHome.sourceSize.find((x: any) => x.id === stateHome.sizeId)
      filter = { ...filter, size: findSize.label }
    }
    const parse = JSON.stringify(filter)
    const resList: any = yield call(GET, url + list + `?search=${parse}`)
    const data = { list: resList.res.map(funcMapList), isLoading: false }
    yield put({ type: types.HOME_FETCH_DATA_GLOBAL, data })
  } catch (err) {
    yield put({ type: types.HOME_SET_LOADER, value: false })
    throw err
  }
}

export function* fetchClear(): Generator {
  try {
    yield put({ type: types.HOME_FETCH_DATA_GLOBAL, data: { areaId: 0, sizeId: 0 } })
    yield call(fetchSearch)
  } catch (err) {
    throw err
  }
}

export function* fetchDelete(param: { uuid: string, type: string }): Generator {
  try {
    const body = { condition: { uuid: param.uuid } }
    yield call(DELETE, url + list, body)
    yield call(fetchSearch)
  } catch (err) {
    throw err
  }
}

export function* fetchGetEdit(param: { uuid: string, type: string }): Generator {
  try {
    yield put({ type: types.HOME_SET_LOADER, value: true })
    const getMaster: any = yield call(fetchGetMaster)
    const filter = { uuid: param.uuid }
    const parse = JSON.stringify(filter)
    const resGetData: any = yield call(GET, url + list + `?search=${parse}&limit=1`)
    if (resGetData.res.length !== 0) {
      const area = getMaster.sourceArea.filter((x: { label: string }) => x.label === resGetData.res[0].area_kota.toUpperCase())
      const size = getMaster.sourceSize.filter((x: { label: string }) => x.label === resGetData.res[0].size)
      const data = {
        form: {
          komoditas: resGetData.res[0].komoditas,
          areaId: area.length !== 0 ? area[0].id : 0,
          sizeId: size.length !== 0 ? size[0].id : 0,
          price: resGetData.res[0].price
        }
      }
      yield put({ type: types.HOME_FETCH_DATA_GLOBAL, data })
    }
    yield put({ type: types.HOME_SET_LOADER, value: false })
  } catch (err) {
    yield put({ type: types.HOME_SET_LOADER, value: false })
    throw err
  }
}

export function* fetchSubmitForm(param: { uuid?: string, history: any; type: string }): Generator {
  try {
    yield put({ type: types.HOME_SET_LOADER, value: true })
    const stateHome: any = yield select(getStateHome)
    const { komoditas, areaId, sizeId, price } = stateHome.form
    const area = stateHome.sourceArea.find((x: { id: number }) => x.id === areaId)
    const size = stateHome.sourceSize.find((x: { id: number }) => x.id === sizeId)
    if (param.uuid) {
      const body = {
        condition: { uuid: param.uuid },
        set: {
          area_kota: area.label,
          area_provinsi: area.province,
          komoditas,
          price: price,
          size: size.label,
        }
      }
      yield call(PUT, url + list, body)
    }
    yield put({ type: types.HOME_SET_LOADER, value: false })
    yield call(SwallSuccess)
    param.history.goBack()
  } catch (err) {
    yield put({ type: types.HOME_SET_LOADER, value: false })
    throw err
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.HOME_FETCH_DATA, fetchData),
    takeLatest(types.HOME_FETCH_SEARCH, fetchSearch),
    takeLatest(types.HOME_FETCH_CLEAR, fetchClear),
    takeLatest(types.HOME_FETCH_DELETE, fetchDelete),
    takeLatest(types.HOME_FETCH_SUBMIT_FORM, fetchSubmitForm),
    takeLatest(types.HOME_FETCH_GET_EDIT_FORM, fetchGetEdit),
  ]);
}
