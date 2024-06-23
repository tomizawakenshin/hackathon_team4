export const handleStartGame = async () => {
    try {
        const response = await fetch('/api/start-game', {
            method: 'PUT',
        });
        if (response.ok) {
            console.log('ゲームが開始されました');
        } else {
            console.error('ゲームの開始に失敗しました');
        }
    } catch (error) {
        console.error('エラー:', error);
    }
};
