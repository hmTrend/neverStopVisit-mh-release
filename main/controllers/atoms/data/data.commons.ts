const instances = {};

// 싱글턴 패턴을 적용한 DataCommons
export function DataCommons(key, initialData = null) {
  // 이미 생성된 인스턴스가 있으면 해당 인스턴스를 반환
  if (instances[key]) {
    // initialData가 제공되었고 기존 데이터가 null이면 초기화
    if (initialData !== null && instances[key].getData() === null) {
      instances[key].setData(initialData);
    }
    return instances[key];
  }

  // 새 인스턴스 생성
  let commonData = initialData;

  // 인스턴스 생성
  instances[key] = {
    // 데이터 가져오기
    getData: () => commonData,

    // 데이터 설정하기
    setData: (newData) => {
      commonData = newData;
      return commonData;
    },

    // 데이터 업데이트하기 (객체인 경우)
    updateData: (partialData) => {
      if (
        typeof commonData === "object" &&
        commonData !== null &&
        typeof partialData === "object"
      ) {
        commonData = { ...commonData, ...partialData };
      } else {
        commonData = partialData;
      }
      return commonData;
    },

    // 데이터 초기화하기
    resetData: () => {
      commonData = initialData;
      return commonData;
    },
  };

  return instances[key];
}
