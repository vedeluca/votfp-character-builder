function DOUBLE(input) {
  return input * 2;
}

class Attribute{
  constructor(){
    this._die = 4;
    this._mod = 0;
  }
  set die(d){
    this._die = d; 
  }
  get die(){
    return this._die;
  }
  set mod(m){
    this._mod = m;
  }
  get mod(){
    return this._mod;
  }
}