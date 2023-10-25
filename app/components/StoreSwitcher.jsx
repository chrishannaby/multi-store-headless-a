import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {isDev} from '~/utils';

function Nav({stores, currentStore, cart}) {
  const cartId = cart?.id;
  const encodedCartId = encodeURIComponent(cartId);
  const cartQuery = cartId ? `?cartId=${encodedCartId}` : '';
  return (
    <ul className="flex">
      {stores.map((store) => {
        const isCurrentStore = currentStore.id === store.id;
        const url = isCurrentStore
          ? '/'
          : `${isDev ? 'http' : 'https'}://${store.domain}${cartQuery}`;
        return (
          <li
            key={store.id}
            className={`mr-4 ${isCurrentStore ? 'underline font-bold' : ''}`}
          >
            <a href={url}>{store.name}</a>
          </li>
        );
      })}
    </ul>
  );
}

export function StoreSwitcher({stores, currentStore, cart}) {
  return (
    <div>
      <Suspense
        fallback={
          <Nav stores={stores} currentStore={currentStore} cart={null} />
        }
      >
        <Await resolve={cart}>
          {(cart) => (
            <Nav stores={stores} currentStore={currentStore} cart={cart} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
