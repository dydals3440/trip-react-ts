// HOC는 with라는 prefix가 붙음

import { Suspense, ComponentType, ReactNode } from 'react'

function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return (props: Props) => {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}

export default withSuspense
// HOC를 활용하면 App이라고 하는애는 로딩을 신경안써도됨.
// withSuspense(<App/>, { fallback: <로딩컴포넌트/ > })
