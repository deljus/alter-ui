import { createSelector } from 'reselect';

export const getIndexPageStructure = state => state.indexPageStructure;

export const getValidateStructure = state => state.validatePageStructure;

export const getResultPageStructure = state => state.resultPageStructure;

export const getAllModels = state => state.allModels;

export const getAllAdditives = state => state.allAdditives;