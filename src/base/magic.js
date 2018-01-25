class Serialize {
  static modelsOfTypes(type, models, magic) {
    if (type === magic.StructureType.MOLECULE) {
      return models.filter(o => o.type === magic.ModelType.MOLECULE_SEARCHING);
    } else if (type === magic.StructureType.REACTION) {
      return models.filter(o => o.type === magic.ModelType.REACTION_SEARCHING);
    }
    return [];
  }

  static models(task, models, magic) {
    return task.structures.map((structure) => {
      const modelSorted = this.modelsOfTypes(structure.type, models, magic);
      return {
        ...structure,
        cml: structure.data,
        models: modelSorted,
        selectModel: modelSorted[0].model,
      };
    });
  }
}

export default Serialize;
