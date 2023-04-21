import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'product-create',
    loadChildren: () => import('./product-create/product-create.module').then( m => m.ProductCreatePageModule)
  },
  {
    path: 'product-edit',
    loadChildren: () => import('./product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./chat-list/chat-list.module').then( m => m.ChatListPageModule)
  },
  {
    path: 'chat-details',
    loadChildren: () => import('./chat-details/chat-details.module').then( m => m.ChatDetailsPageModule)
  },
  {
    path: 'delivery-list',
    loadChildren: () => import('./delivery-list/delivery-list.module').then( m => m.DeliveryListPageModule)
  },
  {
    path: 'delivery-detail',
    loadChildren: () => import('./delivery-detail/delivery-detail.module').then( m => m.DeliveryDetailPageModule)
  },
  {
    path: 'delivery-create',
    loadChildren: () => import('./delivery-create/delivery-create.module').then( m => m.DeliveryCreatePageModule)
  },
  {
    path: 'product-variations',
    loadChildren: () => import('./product-variations/product-variations.module').then( m => m.ProductVariationsPageModule)
  },
  {
    path: 'branch-list',
    loadChildren: () => import('./branch-list/branch-list.module').then( m => m.BranchListPageModule)
  },
  {
    path: 'support-list',
    loadChildren: () => import('./support-list/support-list.module').then( m => m.SupportListPageModule)
  },
  {
    path: 'support-create',
    loadChildren: () => import('./support-create/support-create.module').then( m => m.SupportCreatePageModule)
  },
  {
    path: 'support-edit',
    loadChildren: () => import('./support-edit/support-edit.module').then( m => m.SupportEditPageModule)
  },
  {
    path: 'branch-create',
    loadChildren: () => import('./branch-create/branch-create.module').then( m => m.BranchCreatePageModule)
  },
  {
    path: 'branch-edit',
    loadChildren: () => import('./branch-edit/branch-edit.module').then( m => m.BranchEditPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'selector',
    loadChildren: () => import('./selector/selector.module').then( m => m.SelectorPageModule)
  },
  {
    path: 'selectormany',
    loadChildren: () => import('./selectormany/selectormany.module').then( m => m.SelectormanyPageModule)
  },
  {
    path: 'product-link',
    loadChildren: () => import('./product-link/product-link.module').then( m => m.ProductLinkPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-featuredlink',
    loadChildren: () => import('./profile-featuredlink/profile-featuredlink.module').then( m => m.ProfileFeaturedlinkPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'menu-list',
    loadChildren: () => import('./menu-list/menu-list.module').then( m => m.MenuListPageModule)
  },
  {
    path: 'menu-create',
    loadChildren: () => import('./menu-create/menu-create.module').then( m => m.MenuCreatePageModule)
  },
  {
    path: 'wallet-credit',
    loadChildren: () => import('./wallet-credit/wallet-credit.module').then( m => m.WalletCreditPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'fnb',
    loadChildren: () => import('./fnb/fnb.module').then( m => m.FnbPageModule)
  },
  {
    path: 'balancecredit',
    loadChildren: () => import('./balancecredit/balancecredit.module').then( m => m.BalancecreditPageModule)
  },
  {
    path: 'oldorderlist',
    loadChildren: () => import('./oldorderlist/oldorderlist.module').then( m => m.OldorderlistPageModule)
  },
  {
    path: 'oldorderdetail',
    loadChildren: () => import('./oldorderdetail/oldorderdetail.module').then( m => m.OldorderdetailPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },  {
    path: 'newmenulist',
    loadChildren: () => import('./newmenulist/newmenulist.module').then( m => m.NewmenulistPageModule)
  },
  {
    path: 'pop-custom',
    loadChildren: () => import('./pop-custom/pop-custom.module').then( m => m.PopCustomPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
