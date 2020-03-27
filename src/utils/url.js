const HOME = "http://localhost:8080"

export default {
    adminLogin: () => "/mock/adminLogin.json",
    adminForget: () => "/mock/adminForget.json",
    adminFetchSiderContent: () => "/mock/adminFetchSiderContent.json",
    companyInfo: () =>
        HOME + "/company",
    // "/mock/companyInfo.json",
    alterCompanyInfo: () =>
        HOME + "/company",
    //"/mock/companyInfo.json",
    fetchShop: (uid) =>
        HOME + `/shop/${uid}`,
    // "/mock/shopInfo.json",
    fetchShops: () =>
        HOME + "/shops",
    // "/mock/shopList.json",
    removeShop: (uid) => HOME + `/shop/${uid}`,
    //"/mock/alterBoxInfo.json",
    fetchClerks: () => HOME + `/clerks`,
    // "/mock/allClerks.json",
    alterBoxInfo: () => "/mock/alterBoxInfo.json",
    removeShopBox: (uid) => HOME + `/shopBox/${uid}`,
    // "/mock/alterBoxInfo.json",
    addBoxInfo: () => HOME + "/shopBox",
    // "/mock/addBoxInfo.json",
    alterShopInfo: () => "/mock/alterBoxInfo.json",
    addShop: () => HOME + "/shop",
    // "/mock/addShop.json",
    fetchAllAuthority: () => "/mock/allAuthority.json",
    fetchPositions: () => HOME + "/positions",
    // "/mock/allPosition.json",
    alterClerkInfo: () => "/mock/alterClerkInfo.json",
    removeClerk: (uid) => HOME + `/clerk/${uid}`,
    // "/mock/alterClerkInfo.json",
    addClerk: () => HOME + "/clerk",
    // "/mock/addClerk.json",
    fetchProductTypes: () => HOME + "/productTypes",
    //  "/mock/productType.json",
    fetchProductDetailByType: () => "/mock/productDetailByType.json",
    fetchCustomerTypes: () => HOME + "/customerTypes",
    // "/mock/customerType.json",
    fetchActivities: () => HOME+"/activities",
    // "/mock/activities.json",
    terminalActivity: (uid) => HOME+`/activity/${uid}`,
    // "/mock/alterBoxInfo.json",
    addActivity: () => HOME+"/activity",
    //"/mock/activities.json",
    createNewProductType: () => "/mock/productType.json",
    createNewProduct: () => "/mock/productDetailByType.json",
    terminalProductSale: () => "/mock/productDetailByType.json",
    alterProductInfo: () => "/mock/productDetailByType.json",
    fetchEnterpriseCustomerApplication: () => "/mock/enterpriseCustomerApplication.json",
    startApplicationCheck: () => "/mock/enterpriseCustomerApplication.json",
    admitApplication: () => "/mock/enterpriseCustomerApplication.json",
    rejectApplication: () => "/mock/enterpriseCustomerApplication.json",
    fetchAllCustomers: () => "/mock/customers.json",
    setSuperVIP: () => "/mock/customers.json",
    fetchOrdersByCustomer: () => "/mock/ordersByCustomer.json",
    fetchCustomerById: () => "/mock/customer.json",
    deleteOrder: () => "/mock/ordersByCustomer.json",
    deleteOrderByBatch: () => "/mock/ordersByCustomer.json",
    fetchOrderById: () => "/mock/order.json",
    uploadPhoto: () => HOME + "/savephoto",
    fetchShopBoxes: () => HOME + "/shopBoxes",
    fetchShopBox: (uid) => HOME + `/shopBox/${uid}`,
    updateShopBox: () => HOME + `/shopBox`,
    updateShop: () => HOME + "/shop",
    fetchClerk: (uid) => HOME + `/clerk/${uid}`,
    updateClerk: () => HOME + "/clerk",
    fetchActivitiesNameDesc:()=>HOME+"/activitiesNameDesc",
    fetchActivityRuleTypes:()=>HOME+"/activityRuleTypes",
    fetchProductsName:()=>HOME+`/productsName`,
    fetchActivity:(uid)=>HOME+`/activity/${uid}`,
    updateActivity:()=>HOME+"/activity",
}