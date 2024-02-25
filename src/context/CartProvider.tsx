export type CartItemType = {
  sku:string,
  name:string,
  price:number,
  quantity:number
}

type CartStateType = {cart:CartItemType[]}

const initCartState: CartStateType = {cart:[]};

const REDUCER_ACTION_TYPE = {
  ADD:'ADD',
  REMOVE:'REMOVE',
  QUANTITY:'QUANTITY',
  SUBMIT:'SUBMIT'
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type:string,
  payload?:CartItemType
}

const reducer = (state:CartStateType,action:ReducerAction):CartStateType=>{
  switch(action.type){
    case REDUCER_ACTION_TYPE.ADD: {

    }
    case REDUCER_ACTION_TYPE.REMOVE:{

    }
    case REDUCER_ACTION_TYPE.QUANTITY:{

    }
    case REDUCER_ACTION_TYPE.SUBMIT:{

    }
    default:
      throw new Error('Unidentified reducer action type');
  }
}