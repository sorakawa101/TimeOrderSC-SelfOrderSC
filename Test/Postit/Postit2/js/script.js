class Interact {
constructor(){
    this.applyInteractJs();
}

//interact.jsを適用
applyInteractJs(){
    this.createPositionStorage();
    this.addDraggingEvent();
}

//位置情報を保存する変数を作成
createPositionStorage(){
    this.target = document.querySelectorAll('.js-draggable');
    if(!this.target){
    return;
    }
    const arr = [...this.target];
    this.editStyle = {};
    arr.forEach((el) => {
    this.editStyle[`target-${el.textContent}`] = {
        x     : 0,
        y     : 0,
        scale : 1
    };
    });
}

//ドラッグイベントを適用
addDraggingEvent(){
    if(!this.target){
    return;
    }

    interact('.js-draggable')
    //マルチタッチジェスチャーイベント
    .gesturable({
    onmove: (e) => {
        //2本指での拡大縮小に対応
        this.scaleMoveListener(e);
    }
    })
    //ドラッグ&ドロップイベント
    .draggable({
    // 慣性を付ける
    inertia     : true,
    // 親要素の領域内に要素を保持します
    modifiers   : [
    interact.modifiers.restrictRect({
        //ドラッグの範囲を親要素に設定
        restriction : 'parent',
        //ドラッグの最後の移動値を適用させる。慣性と併用することで動きがスムーズになる
        endOnly     : true
    })
    ],
    // コンテナの端でドラッグまたはサイズ変更の移動が発生した場合、コンテナ（ウィンドウまたはHTMLElement）をスクロールします。
    autoScroll  : true,

    // dragmoveイベント
    onmove      : (e) => {
        this.dragMoveListener(e);
    },
    // dragend イベント
    onend       : (e) => {
        this.dragEndListner(e);
    }
    });
}

/*
* マルチタッチジェスチャー（2本指ピンチ）イベントで拡大縮小
* @param {Object} event
*/
scaleMoveListener(event){
    event.stopPropagation();
    const target    = event.target;
    const target_id = target.textContent;
    const editStyle = this.editStyle[`target-${target_id}`];

    //拡大縮小値を更新
    editStyle.scale = event.scale;

    // css transform で要素を動かす
    this.addEditedStyle(target, editStyle);

    //情報を表示させる
    this.showPositionInfomation(target_id, event);
}

/*
* dragmoveイベントを取得
* @param {Object} event
*/
dragMoveListener(event){
    event.stopPropagation();
    const target    = event.target;
    const target_id = target.textContent;
    const editStyle  = this.editStyle[`target-${target_id}`];

    //位置情報を更新する
    editStyle.x = (parseFloat(editStyle.x) || 0) + event.dx;
    editStyle.y = (parseFloat(editStyle.y) || 0) + event.dy;

    // css transform で要素を動かす
    this.addEditedStyle(target, editStyle);

    //情報を表示させる
    this.showPositionInfomation(target_id, event);
}

/*
* 操作した図形のスタイルを追加する
* @param {Object} editStyle 図形の編集情報
*/
addEditedStyle(target, editStyle){
    // css transform で要素を動かす
    target.style.webkitTransform =
    target.style.transform =
    `translate(${editStyle.x}px, ${editStyle.y}px) scale(${editStyle.scale}`;
    }

/*
* dragendイベントを取得
* @param {Object} event
*/
dragEndListner(event){
    const target_id = event.target.textContent;
    this.showPositionInfomation(target_id, event);
}

/*
* 位置情報を表示させる
* @param {String} target_id
* @param {Object} event
*/
showPositionInfomation(target_id, event){
    //移動距離
    const target = document.getElementById(`js-distance-${target_id}`);
    if(!target){
    return;
    }
    const moveValue = (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0)).toFixed(2) + 'px';
    target.textContent = moveValue;

    //拡大縮小値
    const targetScale = document.getElementById(`js-scale-${target_id}`);
    if(!targetScale){
    return;
    }
    targetScale.textContent = event.scale ? event.scale.toFixed(2) : 1;

}

}
new Interact();