import { Injectable } from "@angular/core";
import { Adapter, ApiModel, Model } from "src/app/core/models/model";

export interface UserCredential extends Model {
	email: string;
	password: string;
}

export interface UserCredentialModel extends ApiModel {
	Email: string;
	Password: string;
}

@Injectable()
export class UserCredentialAdapter extends Adapter<UserCredential, UserCredentialModel> {

	toApi(model: UserCredential): UserCredentialModel {
		return {
			Email: model.email,
			Password: model.password
		}
	}

	fromApi(apiModel: UserCredentialModel): UserCredential {
		return {
			email: apiModel.Email,
			password: apiModel.Password
		}
	}

}