import { useEffect } from "react";

export const useDisableScroll = () => {
  useEffect(() => {
    // スクロールを禁止する
    document.body.style.overflow = "hidden";
    return () => {
      // クリーンアップ時に元に戻す
      document.body.style.overflow = "auto";
    };
  }, []);
};
