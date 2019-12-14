import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {cloneDeep} from 'lodash'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getAllCategories: ['params'],
    getAllCategoriesSuccess: ['categories'],
    getAllCategoriesFailure: ['error'],

    addCategory: ['params'],
    addCategorySuccess: ['category'],
    addCategoryFailure: ['error'],

    addNewBudget: ['params'],
    addNewBudgetSuccess: ['budget'],
    addNewBudgetFailure: ['error'],
})

export const BudgetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    categories: [],
    category: {},
    budget: {},
    success: false,
    updating: false,
})

/* ------------- Reducers ------------- */

// Get All Categories
export const getAllCategories = (state) => state.merge({fetching: true})
export const getAllCategoriesSuccess = (state, {categories}) => state.merge({fetching: false, error: null, categories})
export const getAllCategoriesFailure = (state) => state.merge({fetching: false, error: true})

// Add Budget Category
export const addCategory = (state) => state.merge({updating: true, success: false})
export const addCategorySuccess = (state, {category}) => {
    let categories = Immutable.asMutable(state.categories || [])
    categories.unshift(category)
    return state.merge({updating: false, error: null, category, categories, success: true})
}
export const addCategoryFailure = (state) => state.merge({updating: false, error: true, success: false})

// Add New Budget
export const addNewBudget = (state) => state.merge({fetching: true})
export const addNewBudgetSuccess = (state, {budget}) => state.merge({fetching: false, error: null, budget})
export const addNewBudgetFailure = (state) => state.merge({fetching: false, error: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    [Types.GET_ALL_CATEGORIES]: getAllCategories,
    [Types.GET_ALL_CATEGORIES_SUCCESS]: getAllCategoriesSuccess,
    [Types.GET_ALL_CATEGORIES_FAILURE]: getAllCategoriesFailure,

    [Types.ADD_CATEGORY]: addCategory,
    [Types.ADD_CATEGORY_SUCCESS]: addCategorySuccess,
    [Types.ADD_CATEGORY_FAILURE]: addCategoryFailure,

    [Types.ADD_NEW_BUDGET]: addNewBudget,
    [Types.ADD_NEW_BUDGET_SUCCESS]: addNewBudgetSuccess,
    [Types.ADD_NEW_BUDGET_FAILURE]: addNewBudgetFailure,

})
