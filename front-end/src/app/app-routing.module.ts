import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { FooterOnlyLayoutComponent } from './shared/layout/footer-only-layout/footer-only-layout.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

const routes: Routes = [
	{
		path: 'login', component: FooterOnlyLayoutComponent, children: [
			{ path: '', loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule) }
		]
	},

	{
		path: '', component: MainLayoutComponent, children: [
			{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(x => x.DashboardModule) },
			{ path: "users", loadChildren: () => import("./features/users/users.module").then(x => x.UsersModule) },
			{ path: "category", loadChildren: () => import("./features/categorie/categorie.module").then(x => x.CategorieModule) },
			{ path: "post", loadChildren: () => import("./features/posts/posts.module").then(x => x.PostsModule) },
			{ path: "comment", loadChildren: () => import("./features/comments/comment.module").then(x => x.CommentModule) },
			{ path: "contact", loadChildren: () => import("./features/contacts/contact.module").then(x => x.ContactModule) },
			{ path: '', redirectTo: 'logins', pathMatch: 'full' },

		],
	},

	{ path: '', redirectTo: 'login', pathMatch: 'full' },


	{ path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})

export class AppRoutingModule {
}
