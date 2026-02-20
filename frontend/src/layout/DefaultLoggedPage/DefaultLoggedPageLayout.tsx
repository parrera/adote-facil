'use client'

import * as S from './DefaultLoggedPageLayout.styles'
import { ArrowLeft, List, User } from '@phosphor-icons/react'
import { getUserData } from '@/helpers/get-user-data'
import { UserMenu } from '@/components/UserMenu'
import { useState, useEffect } from 'react' // 1. Adicionamos o useEffect aqui
import Image from 'next/image'
import logo from '../../assets/logo-with-name.png'

export function DefaultLoggedPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false) // 2. Criamos um estado para saber se já estamos no navegador

  // 3. Esse efeito só roda quando a página termina de carregar no navegador
  useEffect(() => {
    setIsClient(true)
  }, [])

  const userData = getUserData()

  const handleChangeOpenMobileMenu = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen)
  }

  return (
    <S.Wrapper>
      <S.MobileHeader>
        <S.MobileMenu $isOpen={mobileMenuIsOpen}>
          <S.MobileMenuIconWrapper onClick={handleChangeOpenMobileMenu}>
            <ArrowLeft size={32} />
          </S.MobileMenuIconWrapper>
          <UserMenu />
        </S.MobileMenu>
        <S.MobileHeaderIconWrapper onClick={handleChangeOpenMobileMenu}>
          <List size={32} />
        </S.MobileHeaderIconWrapper>
        <S.LogoWrapper>
          <Image src={logo} alt="Logo" width={145} height={42} />
        </S.LogoWrapper>
        <S.UserInfo>
          <User size={32} />
          {/* 4. Só mostra o nome se isClient for true (ou seja, se já saiu do servidor) */}
          <span>{isClient ? userData?.name : ''}</span>
        </S.UserInfo>
      </S.MobileHeader>
      
      <S.AsideMenu>
        <S.UserInfo>
          <User size={48} />
          {/* Fazemos o mesmo aqui no menu lateral */}
          <span>{isClient ? userData?.name : ''}</span>
        </S.UserInfo>
        <UserMenu />
      </S.AsideMenu>
      
      {!mobileMenuIsOpen ? <S.PageContent>{children}</S.PageContent> : null}
    </S.Wrapper>
  )
}