// 데이터 구조를 위한 인터페이스
interface ShoppingData {
  // shopping 관련 속성들 정의
  [key: string]: any; // 동적 속성을 위해 임시로 any 사용
}

interface PlaceData {
  // place 관련 속성들 정의
  [key: string]: any; // 동적 속성을 위해 임시로 any 사용
}

// 파라미터 타입 정의
interface SavedDataPlayParams {
  getShoppingData?: Partial<ShoppingData>;
  getPlaceData?: Partial<PlaceData>;
  getMainWindow?: any;
}

// 반환값 타입 정의
interface SavedDataPlayReturn {
  shoppingData?: ShoppingData;
  placeData?: PlaceData;
  mainWindow?: any;
}

// 내부 함수의 타입 정의
export type SavedDataPlayFunction = (
  params?: SavedDataPlayParams,
) => SavedDataPlayReturn;

interface PlayDataInitialFunction {
  (): SavedDataPlayFunction;
}

export const playDataInitial: PlayDataInitialFunction = () => {
  let shoppingData: ShoppingData = {};
  let placeData: PlaceData = {};
  let mainWindow;

  return function savedDataPlay({
    getShoppingData,
    getPlaceData,
    getMainWindow,
  }: SavedDataPlayParams): SavedDataPlayReturn {
    if (getShoppingData) {
      shoppingData = { ...shoppingData, ...getShoppingData };
    }
    if (getPlaceData) {
      placeData = { ...placeData, ...getPlaceData };
    }
    if (getMainWindow) {
      mainWindow = getMainWindow;
    }
    return { shoppingData, placeData, mainWindow };
  };
};
