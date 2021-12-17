export interface Model {
	canUpdate?: boolean;
	canDelete?: boolean;
	canSeeDetails?: boolean;
}

export interface ApiModel {
	CanUpdate?: boolean;
	CanDelete?: boolean;
	CanSeeDetails?: boolean;
}

export abstract class Adapter<T extends Model, U extends ApiModel> {
	protected abstract toApi(model: T): U;
	protected abstract fromApi(apiModel: U): T;

	public convertToApi(model: T): U {
		let result = this.toApi(model);

		result.CanDelete = model.canDelete;
		result.CanUpdate = model.canUpdate;
		result.CanSeeDetails = model.canSeeDetails;

		return result;
	}

	public convertFromApi(apiModel: U): T {
		let result = this.fromApi(apiModel);

		result.canDelete = apiModel.CanDelete;
		result.canUpdate = apiModel.CanUpdate;
		result.canSeeDetails = apiModel.CanSeeDetails;

		return result;
	}
}