/**
 *
 */
class Serialize {
  /**
   * @static
   * @param structureType
   * @param models
   * @param magic
   * @param taskType
   * @return {Array}
   */
  static modelsOfTypes(structureType, models, magic, taskType) {
    if (taskType === magic.TaskType.SEARCHING) {
      if (structureType === magic.StructureType.MOLECULE) {
        return models.filter(o => o.type === magic.ModelType.MOLECULE_SEARCHING);
      } else if (structureType === magic.StructureType.REACTION) {
        return models.filter(o => o.type === magic.ModelType.REACTION_SEARCHING);
      }
    } else if (taskType === magic.TaskType.MODELING) {
      if (structureType === magic.StructureType.MOLECULE) {
        return models.filter(o => o.type === magic.ModelType.MOLECULE_MODELING);
      } else if (structureType === magic.StructureType.REACTION) {
        return models.filter(o => o.type === magic.ModelType.REACTION_MODELING);
      }
    }
    return [];
  }

  /**
   * @static
   * @param task
   * @param models
   * @param magic
   */
  static models(task, models, magic) {
    return task.structures.map((structure) => {
      const modelSorted = this.modelsOfTypes(structure.type, models, magic, task.type);
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
