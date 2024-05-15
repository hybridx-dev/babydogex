import axios from "axios";

export async function listTokensOfOwner(
  account: any,
  contractAddress: any,
  chainId = 1
) {
  const res = await axios.get(
    `https://api.chainbase.online/v1/account/nfts?chain_id=${chainId}&address=${account}&contract_address=${contractAddress}&page=1&limit=100`,
    {
      headers: {
        "x-api-key": `${process.env.NEXT_PUBLIC_CHAINBASE_API_KEY}`,
      },
    }
  );

  if (res.data?.data?.length) {
    const task = res.data.data.map(async ({ token_id }: any) => {
      const endpoint = `${process.env.NEXT_PUBLIC_WOJAX_API_URL}metadata/${token_id}`;
      const res = await axios.get(endpoint);
      const metadata = res.data;
      return { ...metadata, id: token_id };
    });

    return await Promise.all(task);
  }

  return null;
}
