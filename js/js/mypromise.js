class Mypromise {
	constructor(handle) {
		if (typeof handle !== "function") {
			throw new Error("hanle must be a function");
		}
		this._state = "pending";
		this._val = undefined;
    this._onFulfilledQueue = [];
    this._onRejectedQueue = [];

		handle(this._resolve.bind(this), this._reject.bind(this));
	}

	_resolve(res) {
		this._state = "fulfilled";
		this._val = res;
    this._then()
	}

	_reject(err) {
		this._state = "rejected";
		this._val = err;
    this._then();
	}


  _then(resolvedCb, rejectedCb){
    if(this._state === "pending"){
      this._onFulfilledQueue.push(resolvedCb);
      this._onRejectedQueue.push(rejectedCb);
    }
    if(this._state === "fulfilled"){
      this._onFulfilledQueue.shift()(this._val);
    }
    if(this._state === "rejected"){
      this._onRejectedQueue.shift()(this._val);
    }

    // return new Mypromise();
  }
}

let mypromise = new Mypromise((resolve, reject) => {
	setTimeout(() => {
		reject("promise fail");
	}, 1000);
});
mypromise._then((res)=>{
  console.log(res);
}, err=>{
  console.log(err);
})