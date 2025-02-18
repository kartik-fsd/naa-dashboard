
// Helper function to create sandbox URLs
export const createSandboxUrl = (
    provider: string,
    params: {
        flow?: string;
        returnUrl?: string;
        assetType?: string;
        assetTitle?: string;
    }
) => ({
    pathname: `/sandbox/${provider}`,
    state: {
        provider,
        ...params,
    },
});

// Usage in BankLinkingFlow:
// navigate(createSandboxUrl('hdfc-auth', {
//   flow: 'bank-link',
//   returnUrl: '/auth/callback',
//   assetType,
//   assetTitle
// }));
