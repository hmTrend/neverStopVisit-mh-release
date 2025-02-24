export class UtilAnalisys {
  static async measureExecutionTime({
    playCallback,
  }: {
    playCallback: () => Promise<any>;
  }): Promise<number> {
    try {
      const startTime = new Date().getTime(); // 시작 시간 저장

      await playCallback(); // 콜백 함수 실행

      const endTime = new Date().getTime(); // 종료 시간 저장
      const totalSeconds = (endTime - startTime) / 1000; // 밀리초를 초로 변환
      console.log(`totalSeconds > ${totalSeconds}`);
      return Math.floor(totalSeconds);
    } catch (error) {
      console.error(`measureExecutionTime > ${error.message}`);
      throw Error(`measureExecutionTime > ${error.message}`);
    }
  }
}
